// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Smartid",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "Smartid",
            targets: ["smartidPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "smartidPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .target(name: "SmartId") 
            ],
            path: "ios/Sources/smartidPlugin"
        ),
        .binaryTarget(
            name: "SmartId",
            path: "ios/Framework/SmartId.xcframework"
        )
    ]
)