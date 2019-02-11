workflow "Run Tests and Build" {
  on = "push"
  resolves = [
    "Run Tests",
    "Alias",
  ]
}

action "Install Dependencies" {
  uses = "actions/npm@4633da3702a5366129dca9d8cc3191476fc3433c"
  args = "install"
}

action "Build" {
  uses = "actions/npm@4633da3702a5366129dca9d8cc3191476fc3433c"
  args = "build"
  env = {
    NODE_ENV = "production"
  }
  secrets = ["UNSPLASH_APPLICATION_ID"]
  needs = ["Install Dependencies"]
}

action "Run Tests" {
  uses = "actions/npm@4633da3702a5366129dca9d8cc3191476fc3433c"
  needs = ["Install Dependencies"]
  args = "test"
  env = {
    NODE_ENV = "test"
  }
}

action "Deploy" {
  uses = "actions/zeit-now@master"
  needs = ["Build"]
  secrets = ["ZEIT_TOKEN"]
}

action "Alias" {
  uses = "actions/zeit-now@master"
  needs = ["Deploy"]
  secrets = ["ZEIT_TOKEN"]
  args = "alias"
}
