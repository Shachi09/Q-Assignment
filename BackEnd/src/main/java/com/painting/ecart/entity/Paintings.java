package com.painting.ecart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "\"paintings\"")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Paintings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Lob
    @Column(columnDefinition = "CLOB")
    private String image;
    private String keyword;
    private String price;
    private String material;
    private String dimensions;

    // @Version  // Hibernate uses this field for optimistic locking
    // private Integer version;
    // public Paintings() {
    //     this.version = 0;
    // }

}
