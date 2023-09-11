package com.rampcard.rampcardservice.repository;

import com.rampcard.rampcardservice.entity.RampcardStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RampcardStatusRepository extends JpaRepository<RampcardStatus, Integer> {
}
