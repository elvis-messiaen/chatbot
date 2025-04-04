package com.MDD_BACK.controller;

import com.MDD_BACK.Websocket.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class WebsocketController {

    @MessageMapping("/newMessage")
    @SendTo("/topic/sendMessage")
    public Message newChat(@RequestBody Message message) throws Exception {
        return message;
    }
}