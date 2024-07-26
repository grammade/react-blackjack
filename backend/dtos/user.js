class userEndGameDTO{
    constructor(username, state){
        this.username = username
        this.state = state
    }
}
class highScoreDTO{
    constructor(username, w, l, ratio){
        this.username = username
        this.w = w
        this.l = l
        this.ratio = ratio
    }
}

export{userEndGameDTO, highScoreDTO}