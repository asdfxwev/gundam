package com.example.demo.entity;

import java.io.Serializable;
import java.util.Objects;

public class OritemsId implements Serializable {
    private String order_id;
    private String pro_id;

    // 기본 생성자
    public OritemsId() {}

    public OritemsId(String order_id, String pro_id) {
        this.order_id = order_id;
        this.pro_id = pro_id;
    }

    // equals()와 hashCode() 메서드 구현
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OritemsId)) return false;
        OritemsId that = (OritemsId) o;
        return Objects.equals(order_id, that.order_id) &&
               Objects.equals(pro_id, that.pro_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order_id, pro_id);
    }

    // Getters and Setters
    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }

    public String getPro_id() {
        return pro_id;
    }

    public void setPro_id(String pro_id) {
        this.pro_id = pro_id;
    }
}
