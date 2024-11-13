package com.example.activity_log.paths.logs;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason = "No such activity log")
public class LogNotFoundException extends RuntimeException{
}
