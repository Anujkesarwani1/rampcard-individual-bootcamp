package com.rampcard.rampcardservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "transaction")
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand;
    
    @Column(nullable = false)
    private String amount;

    @Column(nullable = false)
    private String date;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany
    @JoinTable(
            name = "txn_qb_category",
            joinColumns = @JoinColumn(name = "transaction_id"),
            inverseJoinColumns = @JoinColumn(name = "quickbook_category_id")
    )
    private List<QuickBookCategory> quickBooksCategories;

    @Column(nullable = false)
    private String receipt;

    @Column(nullable = false)
    private String memo;

    @Column(nullable = false)
    private  String sync;

    public Transaction(int id, String amount) {
        this.id = id;
        this.amount = amount;
    }
}
