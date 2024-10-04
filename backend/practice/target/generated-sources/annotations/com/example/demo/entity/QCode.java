package com.example.demo.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCode is a Querydsl query type for Code
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCode extends EntityPathBase<Code> {

    private static final long serialVersionUID = 133255550L;

    public static final QCode code = new QCode("code");

    public final DateTimePath<java.time.LocalDateTime> code_dtm = createDateTime("code_dtm", java.time.LocalDateTime.class);

    public final StringPath code_id = createString("code_id");

    public final StringPath code_in_user = createString("code_in_user");

    public final StringPath code_info = createString("code_info");

    public final StringPath code_name = createString("code_name");

    public final StringPath code_value = createString("code_value");

    public QCode(String variable) {
        super(Code.class, forVariable(variable));
    }

    public QCode(Path<? extends Code> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCode(PathMetadata metadata) {
        super(Code.class, metadata);
    }

}

