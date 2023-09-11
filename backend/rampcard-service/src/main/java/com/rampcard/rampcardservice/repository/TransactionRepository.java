package com.rampcard.rampcardservice.repository;

import com.rampcard.rampcardservice.entity.QuickBookCategory;
import com.rampcard.rampcardservice.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query("SELECT t.quickBooksCategories FROM Transaction t WHERE t.id = :transactionId")
    List<QuickBookCategory> findQuickBooksCategoriesByTransactionId(@Param("transactionId") Integer transactionId);

}
