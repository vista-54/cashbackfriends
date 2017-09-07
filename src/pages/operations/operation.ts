export class Operation {
    private username = "";
    private sum: number;
    private category: string;
    private time: number;

    /**
     *
     * @param username
     */
    public setUsername(username) {
        this.username = username;
    }

    /**
     *
     * @param sum
     */
    public setSum(sum) {
        this.sum = sum;
    }

    /**
     *
     * @param category
     */
    public setCategory(category) {
        this.category = category;
    }

    /**
     *
     * @param time
     */
    public setTime(time) {
        this.time = time;
    }

}