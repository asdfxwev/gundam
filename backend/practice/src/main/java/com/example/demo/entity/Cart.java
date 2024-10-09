package com.example.demo.entity;

import java.io.Serializable;

import org.hibernate.annotations.Check;
import com.example.demo.entity.CartId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(CartId.class)
public class Cart implements Serializable {
    
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "user_id", nullable = false)  
    private String user_id; 

    @Id
    @Column(name = "pro_id", nullable = false)  
    private String pro_id; 

    @Column(name = "cart_quantity", nullable = false)
    private int cart_quantity; 
}
