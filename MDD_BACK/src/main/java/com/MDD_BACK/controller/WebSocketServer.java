package com.MDD_BACK.controller;

import com.MDD_BACK.Websocket.Message;
import com.MDD_BACK.asynchrone.WebSocketSessionManager;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ServerEndpoint("/websocket/{userId}")
public class WebSocketServer {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketServer.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userId) {
        logger.info("New WebSocket connection: " + userId);
        WebSocketSessionManager.addSession(userId, session);
    }

    @OnClose
    public void onClose(@PathParam("userId") String userId) {
        logger.info("WebSocket connection closed: " + userId);
        WebSocketSessionManager.removeSession(userId);
    }

    @OnMessage
    public void onMessage(String messageStr, @PathParam("userId") String userId) {
        try {
            logger.info("Received message from " + userId + ": " + messageStr);
            Message message = objectMapper.readValue(messageStr, Message.class);

            WebSocketSessionManager.broadcastMessage(message);

        } catch (Exception e) {
            logger.error("Error processing message: ", e);
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        logger.error("WebSocket error: ", throwable);
    }
}