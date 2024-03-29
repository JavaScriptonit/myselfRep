def buildJar() {
    echo "building the application..."
    sh 'mvn package'
}

def buildImage() {
    echo "building the docker image..."
    withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
        sh 'docker build -t nanajanashia/demo-app:jma-2.0 .'
        sh "echo $PASS | docker login -u $USER --password-stdin"
        sh 'docker push nanajanashia/demo-app:jma-2.0'
    }
}

def deployApp() {
    echo 'deploying the application...'
}

return this

// https://techworld-with-nana.teachable.com/courses/1108792/lectures/28665212 - Create complete Pipeline
// https://gitlab.com/JavaScriptonit/java-maven-app/-/blob/master/script.groovy - Example of script file