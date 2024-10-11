package com.example.demo.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReview is a Querydsl query type for Review
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReview extends EntityPathBase<Review> {

    private static final long serialVersionUID = -369689943L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReview review = new QReview("review");

    public final QOrders order;

    public final QProduct product;

    public final StringPath rev_answer = createString("rev_answer");

    public final DateTimePath<java.time.LocalDateTime> rev_answer_creat = createDateTime("rev_answer_creat", java.time.LocalDateTime.class);

    public final StringPath rev_com = createString("rev_com");

    public final DateTimePath<java.time.LocalDateTime> rev_creat = createDateTime("rev_creat", java.time.LocalDateTime.class);

    public final NumberPath<Long> rev_id = createNumber("rev_id", Long.class);

    public final StringPath rev_image = createString("rev_image");

    public final StringPath rev_rating = createString("rev_rating");

    public final StringPath rev_title = createString("rev_title");

    public final QUser user;

    public QReview(String variable) {
        this(Review.class, forVariable(variable), INITS);
    }

    public QReview(Path<? extends Review> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReview(PathMetadata metadata, PathInits inits) {
        this(Review.class, metadata, inits);
    }

    public QReview(Class<? extends Review> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.order = inits.isInitialized("order") ? new QOrders(forProperty("order"), inits.get("order")) : null;
        this.product = inits.isInitialized("product") ? new QProduct(forProperty("product")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

