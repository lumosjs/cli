const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const path = require('path');

const controllerGenerateFile = require('../generate/controller');

describe('Controller Generator', function () {
  it('should create a new controller file', function () {
    // Mocking process.cwd() for testing purposes
    const originalCwd = process.cwd();
    process.cwd = () => '/mocked/current/directory';

    // Mocking fs.existsSync() for testing purposes
    const originalExistsSync = fs.existsSync;
    fs.existsSync = dirPath => true; // Assuming the directory exists for this test

    // Mocking fs.writeFileSync() for testing purposes
    const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');

    controllerGenerateFile(); // Call your function

    // Assertions
    expect(writeFileSyncStub.calledOnce).to.be.true;
    expect(writeFileSyncStub.getCall(0).args[0]).to.equal(
      path.join('/mocked/current/directory', 'app', 'controllers', 'controller-name.js')
    );

    // Restore the mocked functions
    process.cwd = originalCwd;
    fs.existsSync = originalExistsSync;
    writeFileSyncStub.restore();
  });

  it('should handle directory not existing', function () {
    // Mocking process.cwd() for testing purposes
    const originalCwd = process.cwd();
    process.cwd = () => '/mocked/current/directory';

    // Mocking fs.existsSync() for testing purposes
    const originalExistsSync = fs.existsSync;
    fs.existsSync = dirPath => false; // Simulate directory not existing

    // Mocking console.log() for testing purposes
    const consoleLogStub = sinon.stub(console, 'log');

    controllerGenerateFile(); // Call your function

    // Assertions
    expect(consoleLogStub.calledOnce).to.be.true;
    expect(consoleLogStub.getCall(0).args[0]).to.include('Directory controller does not exist');

    // Restore the mocked functions
    process.cwd = originalCwd;
    fs.existsSync = originalExistsSync;
    consoleLogStub.restore();
  });

  // Add more tests as needed
});
