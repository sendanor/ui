import JsonSessionStorageService from "./JsonSessionStorageService";
import SessionStorageService from "./SessionStorageService";
import SpyInstance = jest.SpyInstance;

describe('JsonSessionStorageService', () => {

    let storeMock : {
        hasItem        : SpyInstance,
        getItem        : SpyInstance,
        removeItem     : SpyInstance,
        setItem        : SpyInstance,
        removeAllItems : SpyInstance,
    };

    beforeAll(() => {

        storeMock = {
            hasItem        : jest.spyOn(SessionStorageService, 'hasItem'),
            getItem        : jest.spyOn(SessionStorageService, 'getItem'),
            removeItem     : jest.spyOn(SessionStorageService, 'removeItem'),
            setItem        : jest.spyOn(SessionStorageService, 'setItem'),
            removeAllItems : jest.spyOn(SessionStorageService, 'removeAllItems')
        };

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('.hasItem', () => {

        test('returns true for defined value', () => {
            storeMock.hasItem.mockReturnValue(false).mockReturnValueOnce(true);
            expect( JsonSessionStorageService.hasItem('foo') ).toBe(true);
        });

        test('returns false for non-defined values', () => {
            storeMock.hasItem.mockReturnValue(false);
            expect( JsonSessionStorageService.hasItem('foo') ).toBe(false);
        });

    });

    describe('.getItem', () => {

        test('returns the parsed value for defined JSON value', () => {
            storeMock.getItem.mockReturnValue(null).mockReturnValueOnce('"bar"');
            expect( JsonSessionStorageService.getItem('foo') ).toBe('bar');
        });

        test('returns null for non-defined values', () => {
            storeMock.getItem.mockReturnValue(null);
            expect( JsonSessionStorageService.getItem('foo') ).toBeNull();
        });

    });

    describe('.removeItem', () => {

        test('calls window.localStorage.removeItem', () => {
            expect( storeMock.removeItem ).not.toHaveBeenCalled();
            JsonSessionStorageService.removeItem('foo');
            expect( storeMock.removeItem ).toHaveBeenCalledTimes(1);
        });

        test('returns itself for chaining', () => {
            expect( JsonSessionStorageService.removeItem('foo') ).toBe(JsonSessionStorageService);
        });

    });

    describe('.setItem', () => {

        test('calls window.localStorage.setItem', () => {

            expect( storeMock.setItem ).not.toHaveBeenCalled();
            JsonSessionStorageService.setItem('foo', 'bar');
            expect( storeMock.setItem ).toHaveBeenCalledTimes(1);
            expect( storeMock.setItem.mock.calls[0][0] ).toBe('foo');
            expect( storeMock.setItem.mock.calls[0][1] ).toBe('"bar"');

        });

        test('returns itself for chaining', () => {
            expect( JsonSessionStorageService.setItem('foo', 'bar') ).toBe(JsonSessionStorageService);
        });

    });

    describe('.removeAllItems', () => {

        test('calls window.localStorage.clear()', () => {
            expect( storeMock.removeAllItems ).not.toHaveBeenCalled();
            JsonSessionStorageService.removeAllItems();
            expect( storeMock.removeAllItems ).toHaveBeenCalledTimes(1);
        });

        test('returns itself for chaining', () => {
            expect( JsonSessionStorageService.removeAllItems() ).toBe(JsonSessionStorageService);
        });

    });

});
