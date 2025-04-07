package com.MDD_BACK.asynchrone;

import com.MDD_BACK.Websocket.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

public class WebSocketSessionManager {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketSessionManager.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static ConcurrentHashMap<String, Session> sessions = new ConcurrentHashMap<>();
    private static ConcurrentHashMap<String, List<Message>> pendingMessages = new ConcurrentHashMap<>();

    public static void addSession(String userId, Session session) {
        logger.info("Adding session for user: " + userId);
        sessions.put(userId, session);
        sendPendingMessages(userId);
    }

    public static void removeSession(String userId) {
        logger.info("Removing session for user: " + userId);
        sessions.remove(userId);
    }

    public static Session getSession(String userId) {
        return sessions.get(userId);
    }

    public static void broadcastMessage(Message message) {
        String messageJson;
        try {
            messageJson = objectMapper.writeValueAsString(message);
            logger.info("Broadcasting message: " + messageJson);

            // Envoyer à toutes les sessions actives
            sessions.forEach((userId, session) -> {
                if (session.isOpen()) {
                    try {
                        session.getAsyncRemote().sendText(messageJson);
                    } catch (Exception e) {
                        logger.error("Error sending message to " + userId, e);
                        addPendingMessage(userId, message);
                    }
                } else {
                    addPendingMessage(userId, message);
                }
            });
        } catch (Exception e) {
            logger.error("Error serializing message", e);
        }
    }

    private static void sendPendingMessages(String userId) {
        Session session = sessions.get(userId);
        if (session != null && session.isOpen()) {
            List<Message> messages = pendingMessages.get(userId);
            if (messages != null && !messages.isEmpty()) {
                logger.info("Sending pending messages to user: " + userId);
                for (Message message : messages) {
                    try {
                        String messageJson = objectMapper.writeValueAsString(message);
                        session.getAsyncRemote().sendText(messageJson);
                    } catch (Exception e) {
                        logger.error("Error sending pending message to " + userId, e);
                        return;
                    }
                }
                pendingMessages.remove(userId);
            }
        }
    }

    public static void addPendingMessage(String userId, Message message) {
        logger.info("Adding pending message for user: " + userId);
        pendingMessages.computeIfAbsent(userId, k -> new ArrayList<>()).add(message);
    }

    public static List<Message> getPendingMessages(String userId) {
        return pendingMessages.getOrDefault(userId, new ArrayList<>());
    }

    public static void clearPendingMessages(String userId) {
        pendingMessages.remove(userId);
    }
}