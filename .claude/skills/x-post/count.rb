# X(旧Twitter)の重み付き文字数を数える。上限は 280。
# 使い方: ruby .claude/skills/x-post/count.rb < post.txt
# 規則(twitter-text v3 準拠の簡易版):
#   - URL は長さに関係なく 23
#   - 書記素(絵文字の異体字セレクタ等を含む1文字)ごとに、先頭コードポイントが軽量範囲なら 1、それ以外(全角・絵文字)は 2
LIGHT_RANGES = [0..4351, 8192..8205, 8208..8223, 8242..8247].freeze
URL_PATTERN = %r{https?://\S+}

text = $stdin.read.chomp
urls = text.scan(URL_PATTERN)
rest = text.gsub(URL_PATTERN, "")

weight = rest.each_grapheme_cluster.sum do |g|
  LIGHT_RANGES.any? { |r| r.cover?(g.ord) } ? 1 : 2
end
total = weight + urls.size * 23

puts "#{total} / 280#{total > 280 ? ' (超過)' : ''}"
