$(document).ready(function () {
    // leaderboardContainer holds all of our player's scores
    // var app = require("../models")
    var leaderboardContainer = $(".leaderboard-container");
    var players;

    function getPlayers() {
        $.ajax({
            method: "GET",
            url: "/api/player",
            order: ["score", "DESC"]
        }).then((res) => {
            for (var i = 0; i < res.length; i++) {
                var tR = $("<tr>");

                tR.append(
                    $("<td>").text(res[i].username),
                    $("<td>").text(res[i].score),
                    $("<td>").text(res[i].createdAt)
                );
                $("tbody").append(tR);
                //console.log(res[i]);
                // console.log(res[i].username);
            }
        })
    }

    // Getting the initial list of posts
    getPlayers();

    // InitializeRows handles appending all of our constructed post HTML inside
    // leaderboardContainer

    // function loadData() {
    //     var PlayersToAdd = [];
    //     $.ajax({
    //         url: 'api/player',
    //         type: 'post',
    //         data: { columnName: score, sort: sort },
    //         response = $.parseJSON(response)
    //     });
    //     }
})
