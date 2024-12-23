package com.example.activity_log.paths.logs;

import com.example.activity_log.db.LogEntry;
import com.example.activity_log.db.LogRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class LogController {

    private final LogRepository logRepository;

    public LogController(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @GetMapping("/logs")
    public Iterable<LogEntry> getAllLogs() {
        return this.logRepository.findAll();
    }

    @PostMapping("/create")
    public LogEntry createLog(@RequestBody LogEntry logEntry) {
        return this.logRepository.save(logEntry);
    }

    @PutMapping("/update")
    public LogEntry updateLog(@RequestBody LogEntry logEntry) {
        if(this.logRepository.existsById(logEntry.getId())) {
            return this.logRepository.save(logEntry);
        }
        throw new LogNotFoundException();
    }

    @PatchMapping("/set_order")
    @ResponseStatus(HttpStatus.OK)
    public void changeOrderOfLogs(@RequestBody Map<Integer, Integer> logMap) {
        for(Integer id : logMap.keySet()) {
            Integer newIndex = logMap.get(id);
            this.logRepository.updateIndex(id, newIndex);
        }
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteLog(@PathVariable Integer id) {
        if(this.logRepository.existsById(id)) {
            this.logRepository.deleteById(id);
        }
    }
}
