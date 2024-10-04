package com.example.demo.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOrders is a Querydsl query type for Orders
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOrders extends EntityPathBase<Orders> {

    private static final long serialVersionUID = -444111306L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOrders orders = new QOrders("orders");

    public final DateTimePath<java.time.LocalDateTime> order_date = createDateTime("order_date", java.time.LocalDateTime.class);

    public final StringPath order_id = createString("order_id");

    public final StringPath order_status = createString("order_status");

    public final StringPath oritem_address = createString("oritem_address");

    public final NumberPath<Integer> oritem_count = createNumber("oritem_count", Integer.class);

    public final StringPath oritem_dtladdress = createString("oritem_dtladdress");

    public final StringPath oritem_name = createString("oritem_name");

    public final StringPath oritem_number = createString("oritem_number");

    public final NumberPath<Integer> oritem_payment = createNumber("oritem_payment", Integer.class);

    public final StringPath pay_method = createString("pay_method");

    public final StringPath postcode = createString("postcode");

    public final QUser user;

    public QOrders(String variable) {
        this(Orders.class, forVariable(variable), INITS);
    }

    public QOrders(Path<? extends Orders> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOrders(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOrders(PathMetadata metadata, PathInits inits) {
        this(Orders.class, metadata, inits);
    }

    public QOrders(Class<? extends Orders> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

