const JetpackApi = require('./JetpackApi');
const Jetpack = require('../../Entity/Jetpack');
describe('JetpackApi  get Jetpacks', function () {

    test('Test GetJetpacks', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "123",
                name: "The Jetpack",
                image: "base64 ..."
            }
        ]);

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.getJetpacks().then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0]).toBeInstanceOf(Jetpack)
        });
    });
});

describe('JetpackApi  Create Jetpacks', function () {

    test('Test save (create jetpack) with corresponding value', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue(
            {
                id: "123",
                name: "My Jetpack",
                image: "base64..."
            }
        );

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.save('x','y').then(function (resp) {
            expect(resp.id).toBe("123");
            expect(resp.name).toBe("My Jetpack");
            expect(resp.image).toBe("base64...");
            expect(resp).toBeInstanceOf(Jetpack);
        }).catch((e) => {
            fail(e)
        });
    });
});

describe('JetpackApi  Edit Jetpacks', function () {

    test('Test edit (edit jetpack)', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue(
            {
                id: "123",
                name: "The Jetpack",
                image: "base64..."
            }
        );

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.edit('123','test','test').then(resp => {
            expect(resp.id).toBe("123");
            expect(resp.name).toBe("The Jetpack");
            expect(resp.image).toBe("base64...");
            expect(resp).toBeInstanceOf(Jetpack);
        }).catch((e) => {
            fail(e);
        });
    });
});


describe('JetpackApi  search Jetpacks available', function () {

    test('Test searchJetpack (search jetpack)', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "123",
                name: "The Jetpack",
                image: "base64..."
            }
        ]);

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.searchJetpack('01-01-1998','01-01-2019').then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0].id).toBe("123");
            expect(resp[0].name).toBe("The Jetpack");
            expect(resp[0].image).toBe("base64...");
            expect(resp[0]).toBeInstanceOf(Jetpack);
        }).catch((e) => {
            fail(e);
        });
    });
});
