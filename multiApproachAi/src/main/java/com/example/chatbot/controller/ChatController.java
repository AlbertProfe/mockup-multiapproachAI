package com.example.chatbot.controller;

import com.example.chatbot.entity.ChatMessage;
import com.example.chatbot.service.AiChatService;
import com.example.chatbot.service.ChatService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class ChatController {

    private final ChatService chatService;
    private final AiChatService aiChatService;

    public ChatController(ChatService chatService, AiChatService aiChatService) {
        this.chatService = chatService;
        this.aiChatService = aiChatService;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<ChatMessage> messages = chatService.getAllMessages();
        model.addAttribute("messages", messages);
        return "chat";
    }

    @PostMapping("/send")
    @ResponseBody
    public Map<String, String> sendMessage(@RequestBody Map<String, String> payload) {
        String userMessage = payload.get("message");
        chatService.saveMessage("user", userMessage);

        String aiResponse = aiChatService.getResponse(userMessage);
        chatService.saveMessage("assistant", aiResponse);

        return Map.of("response", aiResponse);
    }
}
