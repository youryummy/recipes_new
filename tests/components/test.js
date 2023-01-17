import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

let recipeId;
let fakeRecipeId = "63c0162b0fbc7404c373c56e"
let recipePOSTWrongName = { name: "", summary: "test_POST", duration: 1, steps: ["test_POST"], tags: ["test_POST"], createdBy:"test_POST", imageUrl:"test_POST", ingredients:[""] }
let recipePOSTWrongSummary = { name: "test_POST", summary: "", duration: 1, steps: ["test_POST"], tags: ["test_POST"], createdBy:"test_POST", imageUrl:"test_POST", ingredients:[""] }
let recipePOSTWrongDuration = { name: "test_POST", summary: "test_POST", duration: -20, steps: ["test_POST"], tags: ["test_POST"], createdBy:"test_POST", imageUrl:"test_POST", ingredients:[""] }
let recipePOSTWrongNameAndDuration = { name: "", summary: "test_POST", duration: -1, steps: ["test_POST"], tags: ["test_POST"], createdBy:"test_POST", imageUrl:"test_POST",  ingredients:[""] }
let recipePOSTWrongDurationAndSummary = { name: "Test", summary: "", duration: -1, steps: ["test_POST"], tags: ["test_POST"], createdBy:"test_POST", imageUrl:"test_POST", ingredients:[""] }
let recipePOSTWrongNameAndSummary = { name: "", summary: "", duration: 1, steps: ["test_POST"], tags: ["test_POST"], createdBy:"test_POST", imageUrl:"test_POST", ingredients:[""] }

let recipePOST = { name: "test_POST", summary: "test_POST", duration: 1, steps: ["test_POST"], tags: ["test_POST"], createdBy:"test_POST", imageUrl:"test_POST", ingredients:[""] }
let recipeTestId = { id: "63c2abfd2f771df77136be90", name: "test_POST", summary: "test_POST", duration: 1, steps: ["test_POST"], tags: ["test_POST"], createdBy:"test_POST", imageUrl:"test_POST", ingredients:[""] }
let recipePUT = { name: "test_UPDATE", summary: "test_UPDATE", duration: 2, steps: ["test_UPDATE"], tags: ["test_UPDATE"], createdBy:"test_UPDATE", imageUrl:"test_UPDATE", ingredients:[""] }
let recipePUTWrong = { name: "", summary: "", duration: -50, steps: "", tags: "", createdBy:"", imageUrl:30, ingredients:[""]}

const apiURL = "http://localhost:8080"
const req = {}, res = {};
describe("Component tests", function() {
    before(() => {
        // Wait for the service to start
        let delay = new Promise(resolve => setTimeout(resolve, 1000))
        return delay
    })


    describe('/POST Recipes', () => {
        it('should add a recipe', (done) => {
            chai.request(apiURL)
                .post('/api/v1/recipes')
                .send(recipePOST)
                .end((err, res) => {
                    console.log(res.error)
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(recipePOST.name);
                    res.body.should.have.property('summary').eql(recipePOST.summary);
                    res.body.should.have.property('duration').eql(recipePOST.duration);
                    res.body.should.have.property('steps').eql(recipePOST.steps);
                    res.body.should.have.property('tags').eql(recipePOST.tags);
                    res.body.should.have.property('createdBy').eql(recipePOST.createdBy);
                    res.body.should.have.property('imageUrl').eql(recipePOST.imageUrl);
                    res.body.should.have.property('ingredients').eql(recipePOST.ingredients);

                    recipeId = res.body._id;
                    done();

                })
        })
    })

    describe('/GET recipes', () => {
        it('should return all recipes', (done) => {
            chai.request(apiURL)
                .get('/api/v1/recipes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    console.log("Result length: " + res.body.length)
                    chai.expect(res.body).to.have.length.greaterThan(0);
                    done();
                })
        })


        it('should get recipe by id recipe', (done) => {
            chai.request(apiURL)
                .get('/api/v1/recipes/' + recipeId)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(recipeTestId.name);
                    res.body.should.have.property('summary').eql(recipeTestId.summary);
                    res.body.should.have.property('duration').eql(recipeTestId.duration);
                    res.body.should.have.property('steps').eql(recipeTestId.steps);
                    res.body.should.have.property('tags').eql(recipeTestId.tags);
                    res.body.should.have.property('createdBy').eql(recipeTestId.createdBy);
                    res.body.should.have.property('imageUrl').eql(recipeTestId.imageUrl);
                    res.body.should.have.property('ingredients').eql(recipeTestId.ingredients);
                    done();
                })
        })


        describe('/PUT recipes ', () => {
            it('should update recipe', (done) => {
                chai.request(apiURL)
                    .put('/api/v1/recipes/' + recipeId)
                    .send(recipePUT)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        done();
                    })
            })

            it('should not update recipe', (done) => {
                chai.request(apiURL)
                    .put('/api/v1/recipes/' + '63c5fd7d8675bfd39256907f')
                    .send(recipePUT)
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    })
            })

            it('should not add a recipe with wrong name', (done) => {
                chai.request(apiURL)
                    .put('/api/v1/recipes' + recipeId)
                    .send(recipePOSTWrongName)
                    .end((err, res) => {
                        res.body.error == ("validation failed");
                        done();

                    })
            })

            it('should not add a recipe with wrong summary', (done) => {
                chai.request(apiURL)
                    .put('/api/v1/recipes' + recipeId)
                    .send(recipePOSTWrongSummary)
                    .end((err, res) => {
                        res.body.error == ("validation failed");

                        done();

                    })
            })

            it('should not add a recipe with wrong duraition', (done) => {
                chai.request(apiURL)
                    .put('/api/v1/recipes' + recipeId)
                    .send(recipePOSTWrongDuration)
                    .end((err, res) => {
                        res.should.have.status(400);

                        done();

                    })
            })

            it('should not add a recipe with wrong name and duration', (done) => {
                chai.request(apiURL)
                    .put('/api/v1/recipes')
                    .send(recipePOSTWrongNameAndDuration)
                    .end((err, res) => {
                        res.body.error!=("Recipe validation failed: name: Name is required, duration: Path `duration` (-1) is less than minimum allowed value (0).");

                        done();

                    })
            })
            it('should not add a recipe with wrong duration and summary', (done) => {
                chai.request(apiURL)
                    .put('/api/v1/recipes')
                    .send(recipePOSTWrongDurationAndSummary)
                    .end((err, res) => {
                        res.body.error!=("Recipe validation failed: summary: Path `summary` (``) is shorter than the minimum allowed length (1)., duration: Path `duration` (-1) is less than minimum allowed value (0).");

                        done();

                    })
            })
            it('should not add a recipe with wrong name and summary', (done) => {
                chai.request(apiURL)
                    .put('/api/v1/recipes')
                    .send(recipePOSTWrongNameAndSummary)
                    .end((err, res) => {
                        res.body.error!=("Recipe validation failed: name: Name is required, summary: Path `summary` (``) is shorter than the minimum allowed length (1).");

                        done();

                    })
            })
        })


        describe('/DELETE Recipes', () => {
            it('should delete recipe', (done) => {
                chai.request(apiURL)
                    .delete('/api/v1/recipes/' + recipeId)
                    .end((err, res) => {
                        res.should.have.status(204);
                        done();
                    })
            })

        })

        describe('/POST Negative cases Recipes', () => {
            it('should not add a recipe with wrong name', (done) => {
                chai.request(apiURL)
                    .post('/api/v1/recipes')
                    .send(recipePOSTWrongName)
                    .end((err, res) => {
                        res.body.error != ("Recipe validation failed: name: Name is required");

                        done();

                    })
            })

            it('should not add a recipe with wrong summary', (done) => {
                chai.request(apiURL)
                    .post('/api/v1/recipes')
                    .send(recipePOSTWrongSummary)
                    .end((err, res) => {
                        res.body.error != ("Recipe validation failed: summary: Path `summary` (``) is shorter than the minimum allowed length (1).");

                        done();

                    })
            })

            it('should not add a recipe with wrong name and duration', (done) => {
                chai.request(apiURL)
                    .post('/api/v1/recipes')
                    .send(recipePOSTWrongNameAndDuration)
                    .end((err, res) => {
                        res.body.error!=("Recipe validation failed: name: Name is required, duration: Path `duration` (-1) is less than minimum allowed value (0).");

                        done();

                    })
            })
            it('should not add a recipe with wrong duration and summary', (done) => {
                chai.request(apiURL)
                    .post('/api/v1/recipes')
                    .send(recipePOSTWrongDurationAndSummary)
                    .end((err, res) => {
                        res.body.error!=("Recipe validation failed: summary: Path `summary` (``) is shorter than the minimum allowed length (1)., duration: Path `duration` (-1) is less than minimum allowed value (0).");

                        done();

                    })
            })
            it('should not add a recipe with wrong name and summary', (done) => {
                chai.request(apiURL)
                    .post('/api/v1/recipes')
                    .send(recipePOSTWrongNameAndSummary)
                    .end((err, res) => {
                        res.body.error!=("Recipe validation failed: name: Name is required, summary: Path `summary` (``) is shorter than the minimum allowed length (1).");

                        done();

                    })
            })
            it('should not add a recipe with wrong duration', (done) => {
                chai.request(apiURL)
                    .post('/api/v1/recipes')
                    .send(recipePOSTWrongDuration)
                    .end((err, res) => {
                        res.should.have.status(404);

                        done();

                    })
            })

        })
        describe('/GET Negative recipes', () => {

            it('should not get Recipe bc wrong id', (done) => {
                chai.request(apiURL)
                    .get('/api/v1/recipes/' + "ffff")
                    .end((err, res) => {
                        res.should.have.status(500);
                        done();
                    })
            })

            it('should get id not found', (done) => {
                chai.request(apiURL)
                    .get('/api/v1/recipes/' + fakeRecipeId)
                    .end((err, res) => {
                        res.should.have.status(500);
                        done();
                    })
            })
        })
    })
})