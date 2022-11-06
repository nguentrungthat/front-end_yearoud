import pandas as pd
import CF
import sys

input = sys.argv[1]
r_cols = ['user_id', 'item_id', 'rating']
ratings = pd.read_csv('./user_user.dat', sep = ' ', names = r_cols, encoding='latin-1')
Y_data = ratings.values

rs = CF.CF(Y_data, k = 3, uuCF = 1)
rs.fit()

print(rs.recommend(2))

sys.stdout.flush()