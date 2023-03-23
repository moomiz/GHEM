package com.ssafy.ghem.user.config;


import jdk.javadoc.doclet.Doclet;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
    private Set<String> getConsumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        consumes.add("application/x-www-form-urlencoded");
        consumes.add("multipart/form-data");
        return consumes;
    }

    @Bean
    public Docket UserCommentApi() {
        final ApiInfo apiInfo = new ApiInfoBuilder().title("User  API")
                .description("<h3>User API에 대한 문서를 제공한다.</h3>")
                .version("0.0").build();



        return new Docket(DocumentationType.SWAGGER_2) // Swagger 2.0 기반의 문서 작성
                .apiInfo(apiInfo) // 문서에 대한 정보를 설정한다.
                .groupName("b. User")
                .select() // ApiSelectorBuilder를 반환하며 상세한 설정 처리
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.ghem.user"))// 대상으로하는 api 설정
                .paths(PathSelectors.any()) // controller에서 swagger를 지정할 대상 path 설정
                .build();  // Docket 객체 생성
    }

}
