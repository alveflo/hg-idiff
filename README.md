# idiff
Interactive diff for git and mercurial

## Requirements
`node.js`

## Install
```
$ git clone https://github.com/alveflo/idiff.git
$ cd idiff
$ npm install
```
## Register alias
### Mercurial
Add this to your `mercurial.ini` (`~\.hgrc` if you're running unix)
```
[alias]
idiff = !powershell.exe node C:\<full path>\idiff\idiff-hg.js $1
```
## Usage
### Mercurial
```
$ hg idiff
```
## Demo
![demo](https://raw.githubusercontent.com/alveflo/idiff/master/img/demo.png)
