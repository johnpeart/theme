# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "Theme"
  spec.version       = "2.0"
  spec.authors       = ["John Peart"]
  spec.email         = ["hello@johnpe.art"]

  spec.summary       = "This is the theme I use on my personal blog and websites"
  spec.homepage      = "https://github.com/johnpeart/theme"
  spec.license       = "None"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"

  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake"
end