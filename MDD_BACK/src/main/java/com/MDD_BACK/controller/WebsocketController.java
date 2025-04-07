package com.MDD_BACK.controller;

import com.MDD_BACK.Websocket.Message;
import com.MDD_BACK.service.MessageStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class WebsocketController {

    @Autowired
    private MessageStorageService messageStorageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/newMessage")
    @SendTo("/topic/sendMessage")
    public Message newChat(Message message) {
        messageStorageService.storeMessage(message);
        return message;
    }

    @MessageMapping("/getMissedMessages")
    public void getMissedMessages(String userId) {
        List<Message> missedMessages = messageStorageService.getStoredMessages(userId);
        for (Message message : missedMessages) {
            messagingTemplate.convertAndSendToUser(
                    userId,
                    "/topic/missedMessages",
                    message
            );
        }
    }
}