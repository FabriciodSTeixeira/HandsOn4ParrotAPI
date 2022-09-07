const userRoutes = require("../build/index");
const supertest = require("supertest");
const request = supertest(userRoutes);

it("Testing to see if Jest Works", () => {
    expect(1).toBe(1);
});


it("First endpoint Test", async done => {
    const res = await request.get("/user/1")

    expect(response.status).toBe(200)
    expect(response.body.message).toBe({})

    done();
})