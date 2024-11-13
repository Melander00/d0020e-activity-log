package com.example.activity_log.db;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface LogRepository extends CrudRepository<LogEntry, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE LogEntry SET index = :index WHERE id = :id")
    void updateIndex(@Param(value="id") Integer id, @Param(value="index") Integer index);
}
