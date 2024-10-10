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

    public final StringPath proId = createString("proId");

    public final StringPath revAnswer = createString("revAnswer");

    public final DateTimePath<java.time.LocalDateTime> revAnswerCreat = createDateTime("revAnswerCreat", java.time.LocalDateTime.class);

    public final NumberPath<Integer> revCnt = createNumber("revCnt", Integer.class);

    public final StringPath revCom = createString("revCom");

    public final DateTimePath<java.time.LocalDateTime> revCreat = createDateTime("revCreat", java.time.LocalDateTime.class);

    public final NumberPath<Long> revId = createNumber("revId", Long.class);

    public final StringPath revImage = createString("revImage");

    public final StringPath revRating = createString("revRating");

    public final StringPath revTitle = createString("revTitle");

    public final QUser user;

    public final StringPath userId = createString("userId");

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

