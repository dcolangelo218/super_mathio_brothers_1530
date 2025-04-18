class ChatMessage {
    enum Role { system, user, assistant }
    private final Role   role;
    private final String content;
    ChatMessage(Role r, String c){ role=r; content=c; }
    Role   getRole()    { return role; }
    String getContent() { return content; }
}
