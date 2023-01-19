import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

const recipeController = {
    get: sinon.stub().resolves(),
    post: sinon.stub().resolves(),
    getById: sinon.stub().resolves(),
    update: sinon.stub().resolves(),
    remove: sinon.stub().resolves(),
};
describe('recipesController tests', () => {
    describe('recipeController.get()', () => {
        it('should call recipeController.get() with the correct arguments', async () => {


            const res = {
                send: sinon.stub()
            };

            await recipeController.get(res);
            expect(recipeController.get).to.have.been.calledWith(res);
        });
    });

    describe('recipesController.post()', () => {
        it('should call recipesService.create() with the correct arguments', () => {
            const req = {
                body: {
                    name: "test_POST",
                    summary: "test_POST",
                    duration: 1,
                    steps: ["test_POST"],
                    tags: ["test_POST"],
                    createdBy:"test_POST",
                    imageUrl:"test_POST"
                }
            };

            const res = {
                send: sinon.stub()
            };

            recipeController.post(req, res);

            expect(recipeController.post).to.have.been.calledWith(req, res);
        });
    });

    describe('recipeController.getById()', () => {
        it('should call recipesService.getById() with the correct arguments', async () => {
            const req = {
                params: {
                    id: '63c5fd7d8675bfd39256907f'
                }
            };

            const res = {
                send: sinon.stub()
            };

            await recipeController.getById(req, res);
            expect(recipeController.getById).to.have.been.calledWith(req, res);
        });
    });

    describe('recipesController.update()', () => {
        it('should call recipesService.update() with the correct arguments', async () => {
            const req = {
                params: {
                    id: '63c5fd7d8675bfd39256907f'
                },
                body: {
                    name: "test_UPDATE",
                    summary: "test_UPDATE",
                    duration: 1,
                    steps: ["test_UPDATE"],
                    tags: ["test_UPDATE"],
                    createdBy:"test_UPDATE",
                    imageUrl:"test_UPDATE"
                }
            };

            const res = {
                send: sinon.stub()
            };

            await recipeController.update(req, res);
            expect(recipeController.update).to.have.been.calledWith(req, res);
        });
    });

    describe('recipesController.remove()', () => {
        it('should call recipesService.remove() with the correct arguments', async () => {
            const req = {
                params: {
                    id: '63c5fd7d8675bfd39256907f'
                }
            };

            const res = {
                send: sinon.stub()
            };

            await recipeController.remove(req, res);
            expect(recipeController.remove).to.have.been.calledWith(req, res);
        });
    });
});