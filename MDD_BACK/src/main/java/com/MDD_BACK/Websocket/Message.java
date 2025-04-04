package com.MDD_BACK.Websocket;

import java.util.Date;

public class Message {
    private int id;
    private String message;
    private Date date;

    public void setId (int i) {
        this.id = i;
    }
    public int getId() {
        return this.id;
    }
    public String getMessage() {
        return this.message;
    }
    public Date getDate() {
        return this.date;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    public void setDate(Date date) {
        this.date = date;
    }
}