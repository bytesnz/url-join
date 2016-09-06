var urljoin = require('../lib/url-join');

describe('url join', function () {
  it('should work for simple case', function () {
    urljoin('http://www.google.com/', 'foo/bar', '?test=123')
      .should.eql('http://www.google.com/foo/bar?test=123');
  });

  it('should work for simple case with new syntax', function () {
    urljoin(['http://www.google.com/', 'foo/bar', '?test=123'])
      .should.eql('http://www.google.com/foo/bar?test=123');
  });

  it('should work for hashbang urls', function () {
    urljoin(['http://www.google.com', '#!', 'foo/bar', '?test=123'])
      .should.eql('http://www.google.com/#!/foo/bar?test=123');
  });

  it('should ignore undefined parts', function () {
    urljoin(['http://www.google.com', undefined, '#!', 'foo/bar', '?test=123'])
      .should.eql('http://www.google.com/#!/foo/bar?test=123');
  });

  it('should be able to join protocol', function () {
    urljoin('http:', 'www.google.com/', 'foo/bar', '?test=123')
      .should.eql('http://www.google.com/foo/bar?test=123');
  });

  it('should be able to join protocol with slashes', function () {
    urljoin('http://', 'www.google.com/', 'foo/bar', '?test=123')
      .should.eql('http://www.google.com/foo/bar?test=123');
  });

  it('should remove extra slashes', function () {
    urljoin('http:', 'www.google.com///', 'foo/bar', '?test=123')
      .should.eql('http://www.google.com/foo/bar?test=123');
  });

  it('should support anchors in urls', function () {
    urljoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '#faaaaa')
      .should.eql('http://www.google.com/foo/bar?test=123#faaaaa');
  });

  it('should support protocol-relative urls', function () {
    urljoin('//www.google.com', 'foo/bar', '?test=123')
      .should.eql('//www.google.com/foo/bar?test=123')
  });

  it('should support split protocol-relative urls', function () {
    urljoin('//', 'www.google.com', 'foo/bar', '?test=123')
      .should.eql('//www.google.com/foo/bar?test=123')
  });

  it('should merge multiple query params properly', function () {
    urljoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '?key=456')
      .should.eql('http://www.google.com/foo/bar?test=123&key=456');

    urljoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '?boom=value', '&key=456')
      .should.eql('http://www.google.com/foo/bar?test=123&boom=value&key=456');
  });

  it('should work for absolute urls', function() {
    urljoin('/test', 'path', 'here')
      .should.eql('/test/path/here');
  });

  it('should work for absolute urls with a single slash to start', function() {
    urljoin('/', 'test', 'path', 'here')
      .should.eql('/test/path/here');
  });

  it('should work for absolute urls with a single slash to start and start sliash on next', function() {
    urljoin('/', '/test', 'path', 'here')
      .should.eql('/test/path/here');
  });

  it('should work for relative urls', function() {
    urljoin('test', 'path', 'here')
      .should.eql('test/path/here');
  });

  it('should ignore undefined parts', function() {
    urljoin(undefined, 'test', 'path', undefined, 'here')
      .should.eql('test/path/here');
  });

  /*TODO it('should not allow double protocols', function() {
    expect(() => {
      urljoin('http:', 'www.google.com', 'http://', 'google.com')
    }).throw('Duplicate protocol signifier http://www.google.comhttp://google.com');
  });*/
});
