package com.example.demo.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOritems is a Querydsl query type for Oritems
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOritems extends EntityPathBase<Oritems> {

    private static final long serialVersionUID = -877496692L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOritems oritems = new QOritems("oritems");

    public final QOrders order_id;

    public final StringPath oritem_quan = createString("oritem_quan");

    public final QProduct pro_id;

    public QOritems(String variable) {
        this(Oritems.class, forVariable(variable), INITS);
    }

    public QOritems(Path<? extends Oritems> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOritems(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOritems(PathMetadata metadata, PathInits inits) {
        this(Oritems.class, metadata, inits);
    }

    public QOritems(Class<? extends Oritems> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.order_id = inits.isInitialized("order_id") ? new QOrders(forProperty("order_id"), inits.get("order_id")) : null;
        this.pro_id = inits.isInitialized("pro_id") ? new QProduct(forProperty("pro_id")) : null;
    }

}

