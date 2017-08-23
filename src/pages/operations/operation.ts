export class Operation {
    private username = "";
    private sum: number;
    private category: string;
    private time: number;

    public setUsername(username) {
        this.username = username;
    }

    public setSum(sum) {
        this.sum = sum;
    }

    public setCategory(category) {
        this.category = category;
    }

    public setTime(time) {
        this.time = time;
    }

}