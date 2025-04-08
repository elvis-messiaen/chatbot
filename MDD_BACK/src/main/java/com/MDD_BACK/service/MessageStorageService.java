package com.MDD_BACK.service;

import com.MDD_BACK.Websocket.Message;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MessageStorageService {
    private final Map<String, List<Message>> messageStore = new ConcurrentHashMap<>();

    public void storeMessage(Message message) {
        storeForUser("user", message);
        storeForUser("admin", message);
    }

    private void storeForUser(String userId, Message message) {
        messageStore.computeIfAbsent(userId, k -> new ArrayList<>()).add(message);
    }

    public List<Message> getStoredMessages(String userId) {
        List<Message> messages = messageStore.getOrDefault(userId, new ArrayList<>());
        messageStore.remove(userId);
        return messages;
    }
}