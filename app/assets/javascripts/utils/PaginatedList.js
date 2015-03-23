import invariant from 'react/lib/invariant';
import { without, union } from 'underscore';

class PaginatedList {

  constructor(ids) {
    this._ids = ids || [];
    this._pageCount = 0;
    this._nextPageUrl = null;
    this._isExpectingPage = false;
    this._total = 0;
  }

  getIds() {
    return Array.from(this._ids);
  }

  getPageCount() {
    return this._pageCount;
  }

  getTotal() {
    return this._total;
  }

  isExpectingPage() {
    return this._isExpectingPage;
  }

  getNextPageUrl() {
    return this._nextPageUrl;
  }

  isLastPage() {
    return this.getNextPageUrl() === null && this.getPageCount() > 0;
  }

  prepend(id) {
    this._ids = union([id], this._ids);
  }

  remove(id) {
    this._ids = without(this._ids, id);
  }

  expectPage() {
    invariant(!this._isExpectingPage,
              'Cannnot call expectPage twice without prior cancelPage or receivePage call.');
    this._isExpectingPage = true;
  }

  cancelPage() {
    invariant(this._isExpectingPage, 'Cannot call cancelPage without prior expectPage call.');
  }

  receivePage(newIds, nextPageUrl) {
    invariant(this._isExpectingPage, 'Cannot call receivePage without prior expectPage call.');

    console.log('receivePage', arguments);

    if (newIds.length) {
      this._ids = union(this._ids, newIds);
    }

    this._isExpectingPage = false;
    this._nextPageUrl = nextPageUrl;
    this._pageCount++;
  }

}

export default PaginatedList;
