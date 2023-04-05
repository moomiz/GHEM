package com.ssafy.ghem.user.model.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="usergame")
public class UserGame {
    @Id
    @GeneratedValue
    @Column(name = "user_game_id")
    private Long userGameId;
    private int rating;

//    @OneToOne(mappedBy = "userGame")
//    private Helpful helpful;

    @Builder
    public UserGame(int rating){
        this.rating = rating;
    }

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "app_id")
    private Game game;

    private String content;

    @Column(name = "update_date")
    private LocalDateTime updateDate;

    public void setUser(User user){
        if(user.getGames().contains(this)){
            user.getGames().remove(this);
        }

        this.user = user;
        user.getGames().add(this);
    }

    public void setGame(Game game){
        this.game = game;
    }

    public void setDateTime(){
        this.updateDate = LocalDateTime.now();
    }
}