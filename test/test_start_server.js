const sinon = require('sinon');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

const startServer = require('../start');

describe('Start Server Command', function () {
  it('should start the server', function () {
    const originalCwd = process.cwd();
    const mockExec = shell.exec;
    shell.exec = command => {};

    // Mocking fs.existsSync() for testing purposes
    const originalExistsSync = fs.existsSync;
    fs.existsSync = filePath => false; // Assuming the file dont exists for this test

    const startSpy = sinon.spy(shell, 'exec');

    startServer(); // Call your function

    // Assertions
    expect(startSpy.calledOnce).to.be.false;

    // Restore the mocked functions
    process.cwd = originalCwd;
    shell.exec = mockExec;
    fs.existsSync = originalExistsSync;
  });
});