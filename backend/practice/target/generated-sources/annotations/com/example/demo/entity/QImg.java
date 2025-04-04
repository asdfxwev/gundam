package com.example.demo.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QImg is a Querydsl query type for Img
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QImg extends EntityPathBase<Img> {

    private static final long serialVersionUID = 142851602L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QImg img = new QImg("img");

    public final NumberPath<Long> img_id = createNumber("img_id", Long.class);

    public final QProduct pro_id;

    public final StringPath pro_imgs = createString("pro_imgs");

    public final NumberPath<Integer> pro_num = createNumber("pro_num", Integer.class);

    public QImg(String variable) {
        this(Img.class, forVariable(variable), INITS);
    }

    public QImg(Path<? extends Img> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QImg(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QImg(PathMetadata metadata, PathInits inits) {
        this(Img.class, metadata, inits);
    }

    public QImg(Class<? extends Img> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.pro_id = inits.isInitialized("pro_id") ? new QProduct(forProperty("pro_id")) : null;
    }

}

