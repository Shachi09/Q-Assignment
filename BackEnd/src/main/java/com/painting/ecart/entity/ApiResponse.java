package com.painting.ecart.entity;

public class ApiResponse<T> {
    // public class ApiResponse<T> {
        private String message;
        private int status_code;
        private T res;
        private int status;
    
        public ApiResponse(String message, int status_code, T res, int status) {
            this.message = message;
            this.status_code = status_code;
            this.res = res;
            this.status = status;
        }
    
        // Getters and Setters
        public String getMessage() {
            return message;
        }
    
        public void setMessage(String message) {
            this.message = message;
        }
    
        public int getStatus_code() {
            return status_code;
        }
    
        public void setStatus_code(int status_code) {
            this.status_code = status_code;
        }
    
        public T getRes() {
            return res;
        }
    
        public void setRes(T res) {
            this.res = res;
        }
    
        public int getStatus() {
            return status;
        }
    
        public void setStatus(int status) {
            this.status = status;
        }
    // }
    
}
