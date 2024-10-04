package com.example.demo.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 133795676L;

    public static final QUser user = new QUser("user");

    public final StringPath address = createString("address");

    public final StringPath birth = createString("birth");

    public final StringPath dtl_address = createString("dtl_address");

    public final StringPath email = createString("email");

    public final StringPath gender = createString("gender");

    public final DateTimePath<java.time.LocalDateTime> lastcon_dtm = createDateTime("lastcon_dtm", java.time.LocalDateTime.class);

    public final StringPath login_id = createString("login_id");

    public final StringPath password = createString("password");

    public final StringPath phone_num = createString("phone_num");

    public final StringPath postcode = createString("postcode");

    public final NumberPath<Integer> retry = createNumber("retry", Integer.class);

    public final StringPath user_cd = createString("user_cd");

    public final DateTimePath<java.time.LocalDateTime> user_creat = createDateTime("user_creat", java.time.LocalDateTime.class);

    public final StringPath user_id = createString("user_id");

    public final StringPath user_name = createString("user_name");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

