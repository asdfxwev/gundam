package com.example.demo.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = 15086526L;

    public static final QProduct product = new QProduct("product");

    public final StringPath cate_brand = createString("cate_brand");

    public final StringPath cate_piece = createString("cate_piece");

    public final StringPath pro_cate = createString("pro_cate");

    public final StringPath pro_creat = createString("pro_creat");

    public final StringPath pro_des = createString("pro_des");

    public final StringPath pro_id = createString("pro_id");

    public final StringPath pro_name = createString("pro_name");

    public final NumberPath<Integer> pro_price = createNumber("pro_price", Integer.class);

    public final StringPath pro_state_cd = createString("pro_state_cd");

    public final NumberPath<Integer> pro_stock = createNumber("pro_stock", Integer.class);

    public QProduct(String variable) {
        super(Product.class, forVariable(variable));
    }

    public QProduct(Path<? extends Product> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProduct(PathMetadata metadata) {
        super(Product.class, metadata);
    }

}

