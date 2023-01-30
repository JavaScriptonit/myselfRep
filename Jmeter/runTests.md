## 30.01.2023 (13ый раздел) - Jmeter install
* [jmeter.apache.org](https://jmeter.apache.org/)
    * [Run tests NOT GUI mode - Jmeter on macOS](https://www.youtube.com/watch?v=NTyY8wKSvik)
        * `jmeter -n -t /usr/local/Cellar/jmeter/5.5/libexec/backups/LoadTesting.jmx -l /usr/local/Cellar/jmeter/5.5/libexec/backups/Loading.csv` - run tests command
        * `jmeter -n -t (location of your jmeter test script) -l (location of the result file)` - locations
        * `cd /usr/local/Cellar/jmeter/5.5/bin/jmeter` - Jmeter files directory
