import angular from 'angular';
import { Http } from '../Http/Http.js';
import ApiFactory, { ApiFactoryProvider, RESTApi } from './ApiFactory.js';

beforeEach(angular.mock.module(ApiFactory));

describe('ApiFactoryProvider', () => {
    let _ApiFactoryProvider;

    beforeEach(angular.mock.inject(($injector) => {
        _ApiFactoryProvider = $injector.instantiate(ApiFactoryProvider);
    }));

    it('should allow customization of base URL.', () => {
        expect(_ApiFactoryProvider.baseUrl).toBe('');
        _ApiFactoryProvider.setBaseUrl('/test/api');
        expect(_ApiFactoryProvider.baseUrl).toBe('/test/api');
    });

    it('should define a factory to be registered with the injector.', () => {
        expect(_ApiFactoryProvider.$get).toEqual(jasmine.any(Function));
    });
});

describe('ApiFactory', () => {
    let ApiFactory;

    beforeEach(angular.mock.inject(($injector) => {
        ApiFactory = $injector.get('ApiFactory');
    }));

    describe('create', () => {
        it('should create a new RESTApi instance with the specified name passed as a local.',
        angular.mock.inject(($injector) => {
            spyOn($injector, 'instantiate').and.callThrough();
            let TestApi = ApiFactory.create('test');

            expect($injector.instantiate).toHaveBeenCalledWith(RESTApi, {
                name: 'test',
                baseUrl: jasmine.any(String)
            });
            expect(TestApi instanceof RESTApi).toBe(true);
        }));
    });
});

describe('RESTApi', () => {
    let Api;

    beforeEach(angular.mock.inject(($injector) => {
        Api = $injector.instantiate(RESTApi, {
            name: 'test-resource',
            baseUrl: '/test-api'
        });
    }));

    it('should have the right name and baseUrl.', () => {
        expect(Api.name).toBe('test-resource');
        expect(Api.baseUrl).toBe('/test-api');
    });

    describe('getList', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.get with resource url and return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'get').and.returnValue(promise);

            let result = Api.getList();
            expect(Http.prototype.get).toHaveBeenCalledWith('/test-api/test-resource');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'get').and.returnValue($q.resolve({ data: 'the data' }));

            Api.getList()
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('get', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.get with resource url and the given id, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'get').and.returnValue(promise);

            let result = Api.get(1);
            expect(Http.prototype.get).toHaveBeenCalledWith('/test-api/test-resource/1');
            expect(result).toBe(promise);

            // The id doesn't necessarily have to be an "id".
            Http.prototype.get.calls.reset();

            result = Api.get('sub');
            expect(Http.prototype.get).toHaveBeenCalledWith('/test-api/test-resource/sub');
            expect(result).toBe(promise);

        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'get').and.returnValue($q.resolve({ data: 'the data' }));

            Api.get(1)
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('post', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.post with resource url and the given element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'post').and.returnValue(promise);

            let result = Api.post({ the: 'element' });
            expect(Http.prototype.post).toHaveBeenCalledWith('/test-api/test-resource', { the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'post').and.returnValue($q.resolve({ data: 'the data' }));

            Api.post({ the: 'element' })
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('put', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.put with resource url + element id, and the given element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'put').and.returnValue(promise);

            let result = Api.put({ id: 1, the: 'element' });
            expect(Http.prototype.put).toHaveBeenCalledWith('/test-api/test-resource/1', { id: 1, the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'put').and.returnValue($q.resolve({ data: 'the data' }));

            Api.put({ id: 1, the: 'element' })
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('patch', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.patch with resource url + element id, and the given element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'patch').and.returnValue(promise);

            let result = Api.patch({ id: 1, the: 'element' });
            expect(Http.prototype.patch).toHaveBeenCalledWith('/test-api/test-resource/1', { id: 1, the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'patch').and.returnValue($q.resolve({ data: 'the data' }));

            Api.patch({ id: 1, the: 'element' })
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('delete', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.delete with resource url and the given id, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'delete').and.returnValue(promise);

            let result = Api.delete(1);
            expect(Http.prototype.delete).toHaveBeenCalledWith('/test-api/test-resource/1');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'delete').and.returnValue($q.resolve({ data: 'the data' }));

            Api.delete(1)
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('nestedGet', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.get with resource url and the given path, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'get').and.returnValue(promise);

            let result = Api.nestedGet(1, 'nested-resource', 2);
            expect(Http.prototype.get).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource/2');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'get').and.returnValue($q.resolve({ data: 'the data' }));

            Api.nestedGet(1, 'nested-resource', 2)
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('nestedPost', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.post with resource url and the given path and the element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'post').and.returnValue(promise);

            let result = Api.nestedPost({ the: 'element' }, ...[1, 'nested-resource']);
            expect(Http.prototype.post).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource', { the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'post').and.returnValue($q.resolve({ data: 'the data' }));

            Api.nestedPost({ the: 'element' }, ...[1, 'nested-resource'])
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('nestedPut', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.put with resource url and the given path and the element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'put').and.returnValue(promise);

            let result = Api.nestedPut({ id: 2, the: 'element' }, ...[1, 'nested-resource']);
            expect(Http.prototype.put).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource', { id: 2, the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'put').and.returnValue($q.resolve({ data: 'the data' }));

            Api.nestedPut({ id: 2, the: 'element' }, ...[1, 'nested-resource'])
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('nestedPatch', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.patch with resource url and the given path and the element, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'patch').and.returnValue(promise);

            let result = Api.nestedPatch({ id: 2, the: 'element' }, ...[1, 'nested-resource']);
            expect(Http.prototype.patch).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource', { id: 2, the: 'element' });
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'patch').and.returnValue($q.resolve({ data: 'the data' }));

            Api.nestedPatch({ id: 2, the: 'element' }, ...[1, 'nested-resource'])
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });

    describe('nestedDelete', () => {
        let $rootScope, $q;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        }));

        it('should do a Http.delete with resource url and the given path, then return the promise.', () => {
            let promise = {
                then: () => promise,
                catch: () => promise,
                finally: () => promise
            };
            spyOn(Http.prototype, 'delete').and.returnValue(promise);

            let result = Api.nestedDelete(1, 'nested-resource', 2);
            expect(Http.prototype.delete).toHaveBeenCalledWith('/test-api/test-resource/1/nested-resource/2');
            expect(result).toBe(promise);
        });

        it('should return the data of the response after the request resolves.', () => {
            spyOn(Http.prototype, 'delete').and.returnValue($q.resolve({ data: 'the data' }));

            Api.nestedDelete(1, 'nested-resource', 2)
                .then((result) => expect(result).toBe('the data'))
                .catch(() => fail());

            $rootScope.$digest();
        });
    });
});