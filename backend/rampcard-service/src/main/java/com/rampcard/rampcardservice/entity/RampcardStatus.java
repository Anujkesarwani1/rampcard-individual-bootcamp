package com.rampcard.rampcardservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "rampcard_status")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RampcardStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer count;
}
