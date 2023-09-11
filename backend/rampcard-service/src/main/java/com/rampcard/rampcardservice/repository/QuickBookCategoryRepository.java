package com.rampcard.rampcardservice.repository;

import com.rampcard.rampcardservice.entity.QuickBookCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuickBookCategoryRepository extends JpaRepository<QuickBookCategory, Integer> {
}
