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

    private LogEntry() {}

    public LogEntry(String activity, float time, String results, String github, int index) {
        this.activity = activity;
        this.time = time;
        this.results = results;
        this.github = github;
        this.index = index;
    }

    public String getActivity() {
        return this.activity;
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