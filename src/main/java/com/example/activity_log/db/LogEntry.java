package com.example.activity_log.db;

import jakarta.persistence.*;

@Entity
@Table(name="logEntry")
public class LogEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String activity;
    private float time;
    private String results;
    private String github;
    private Integer index;
    private Integer week;

    private LogEntry() {}

    public LogEntry(String activity, float time, String results, String github, Integer index, Integer week) {
        this.activity = activity;
        this.time = time;
        this.results = results;
        this.github = github;
        this.index = index;
        this.week = week;
    }

    public String getActivity() {
        return activity;
    }

    public float getTime() {
        return time;
    }

    public String getResults() {
        return results;
    }

    public String getGithub() {
        return github;
    }

    public Integer getIndex() {
        return index;
    }

    public Integer getId() {
        return id;
    }

    public Integer getWeek() {
        return week;
    }
}

/*
* (
        int id,
        String activity,
        float time,
        String results,
        String github
)
* */